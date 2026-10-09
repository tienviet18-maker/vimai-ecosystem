"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// A table with a search box over its text cells. Tables of 8 rows or fewer
// stay plain: a search box would only add noise there.
const SEARCH_FROM_ROWS = 8;

export function AdminTable({
  columns,
  rows,
  empty,
}: {
  columns: string[];
  rows: ReactNode[][];
  empty: string;
}) {
  const t = useTranslations("admin");
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? rows.filter((row) =>
        row
          .filter((cell): cell is string => typeof cell === "string")
          .some((cell) => cell.toLowerCase().includes(needle)),
      )
    : rows;

  return (
    <div className="space-y-3">
      {rows.length > SEARCH_FROM_ROWS ? (
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-h-11 max-w-sm bg-white"
          aria-label={t("searchPlaceholder")}
        />
      ) : null}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={`${column}-${index}`}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                  {needle ? t("noMatch") : empty}
                </TableCell>
              </TableRow>
            ) : (
              visible.map((row, index) => (
                <TableRow key={index}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
