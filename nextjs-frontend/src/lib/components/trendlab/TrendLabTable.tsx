// File: src/lib/components/trendlab/TrendLabTable.tsx (New File)
// Last updated: 28 August 2025, 03:30 AM (AEST)
// This is a client-side component that renders an interactive data table for trends.
// It uses shadcn/ui components and React Table to handle sorting, filtering, and pagination.

'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Post } from '@/types' // We'll use the Post type for now
import Link from 'next/link'
import { ArrowUpDown } from 'lucide-react'

// Define the columns for our data table
export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'title',
    header: 'Trend',
    cell: ({ row }) => {
      // Ensure slug and current properties exist before creating a link
      const slug = row.original?.slug?.current;
      return slug ? (
        <Link href={`/trendlab/${slug}`} className="font-medium text-primary hover:underline">
          {row.getValue('title')}
        </Link>
      ) : (
        <span>{row.getValue('title')}</span>
      );
    },
  },
  {
    accessorKey: 'taxonomy.topics',
    header: 'Topic',
    cell: ({ row }) => {
      const topics = row.original?.taxonomy?.topics;
      return topics && topics.length > 0 ? topics.map(t => t.title).join(', ') : 'General';
    }
  },
  {
    accessorKey: 'metrics.likeCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Popularity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const likeCount = row.original?.metrics?.likeCount;
        return <div className="text-center">{likeCount || 0}</div>
    },
  },
  {
    accessorKey: 'publishedAt',
    header: 'Date Added',
    cell: ({ row }) => {
        const date = row.getValue('publishedAt');
        return date ? new Date(date as string).toLocaleDateString() : 'N/A';
    },
  },
]

interface TrendLabTableProps {
  data: Post[]; // In the future, this should be a more specific Trend[] type
}

export function TrendLabTable({ data }: TrendLabTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter trends by title..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
