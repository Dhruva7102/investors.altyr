import React from 'react';

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * SpreadsheetTable
 *
 * Static, no-scroll, spreadsheet-like table for appendix slides.
 *
 * @param {string} title
 * @param {Array<{ key: string, label: string, align?: 'left'|'center'|'right', className?: string }>} columns
 * @param {Array<Record<string, React.ReactNode>>} rows
 * @param {string} note
 * @param {boolean} dense
 */
export default function SpreadsheetTable({
  title,
  columns,
  rows,
  note,
  dense = true,
}) {
  return (
    <div className="w-full">
      {title ? (
        <div className="mb-3">
          <h3 className="text-sm sm:text-base font-light text-white/90">{title}</h3>
        </div>
      ) : null}

      <div className="rounded-xl bg-white/[0.02] border border-white/[0.10]">
        <table className="w-full table-fixed border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key ?? idx}
                  className={cx(
                    'border-b border-white/[0.10] bg-white/[0.04] text-white/80 font-medium',
                    dense ? 'px-2 py-2 text-[10px] sm:text-[11px]' : 'px-3 py-3 text-xs',
                    idx === 0 ? 'rounded-tl-xl' : null,
                    idx === columns.length - 1 ? 'rounded-tr-xl' : null,
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                    col.className
                  )}
                >
                  <span className="block truncate">{col.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="odd:bg-white/[0.01]">
                {columns.map((col, cIdx) => {
                  const isNumeric = col.align === 'right';
                  return (
                    <td
                      key={`${rIdx}-${col.key ?? cIdx}`}
                      className={cx(
                        'border-b border-white/[0.07] text-white/75 font-light align-top',
                        dense ? 'px-2 py-2 text-[10px] sm:text-[11px] leading-tight' : 'px-3 py-3 text-xs',
                        cIdx === 0 ? 'border-l-0' : null,
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left',
                        isNumeric ? 'font-mono tabular-nums' : null,
                        col.className
                      )}
                    >
                      <div className={cx(isNumeric ? 'whitespace-nowrap' : 'whitespace-normal')}>
                        {row[col.key]}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note ? (
        <p className="mt-2 text-[10px] sm:text-[11px] text-white/45 font-light">
          {note}
        </p>
      ) : null}
    </div>
  );
}

