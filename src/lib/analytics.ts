export type AnalyticsSnapshot = {
  source: "cloudflare";
  note: string;
  totals: {
    pageViews: number | null;
    visits: number | null;
    uniqueVisitors: number | null;
  };
  range: string;
};

export async function getAnalyticsSnapshot(): Promise<AnalyticsSnapshot | null> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  if (!token || !zoneId) return null;

  const query = `
    query ($zoneTag: string, $since: Time) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(limit: 1, filter: { datetime_geq: $since }) {
            sum { requests }
            uniq { uniques }
          }
        }
      }
    }
  `;

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { zoneTag: zoneId, since },
      }),
    });
    if (!response.ok) return null;
    const json = (await response.json()) as {
      data?: {
        viewer?: {
          zones?: Array<{
            httpRequests1dGroups?: Array<{
              sum?: { requests?: number };
              uniq?: { uniques?: number };
            }>;
          }>;
        };
      };
    };
    const group = json.data?.viewer?.zones?.[0]?.httpRequests1dGroups?.[0];
    return {
      source: "cloudflare",
      note: "Cloudflare HTTP analytics are approximate and are not a unique-user census.",
      range: "30d",
      totals: {
        pageViews: group?.sum?.requests ?? null,
        visits: group?.sum?.requests ?? null,
        uniqueVisitors: group?.uniq?.uniques ?? null,
      },
    };
  } catch {
    return null;
  }
}
