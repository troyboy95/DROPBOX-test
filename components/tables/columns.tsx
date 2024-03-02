"use client"

import { COLOR_EXTENSION_MAP } from "@/constants"
import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import prettyBytes from "pretty-bytes"
import {FileIcon, defaultStyles} from "react-file-icon"

export const columns: ColumnDef<FileType>[] = [
   {
    accessorKey: 'type',
    header: 'Type',
    cell: ({renderValue, ...props}) => {
        const type = renderValue() as string;
        const extension: string = type.split('/')[1];
        // image/jpeg = [image, jpeg]
        return(
            <div className="w-10">
                <FileIcon 
                extension={extension}
                labelColor={COLOR_EXTENSION_MAP[extension]}
                //@ts-ignore
                {...defaultStyles[extension]}
                />
            </div>
        )
    }
   }, 
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Addded",
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({renderValue, ...props}) => {
        return <span>{prettyBytes(renderValue() as number)}</span>
    }
  },
  {
    accessorKey: 'downloadUrl',
    header: 'Link',
    cell: ({renderValue, ...props}) =>
    {
        const downloadUrl = renderValue() as string;
        if (downloadUrl) {
            return (
                <Link
                    href={downloadUrl}
                    target="_blank"
                    className="underline text-blue-500 hover:text-blue-600"
                >
                    {/* target="_blank" means the link will open in a new tab */}
                    Download
                </Link>
            );
        } else {
            return <div>No download link available</div>;
        }
    }
  }
]
