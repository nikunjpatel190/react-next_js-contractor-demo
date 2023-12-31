import React, { useEffect, useState } from 'react'
import { useTable, useFilters, useRowSelect, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table';
// import { Button, PageButton } from './shared/Button'
import { classNames } from './shared/Utils'
import { SortIcon, SortUpIcon, SortDownIcon } from './shared/Icons';
import { SearchIcon } from '@/components/Icons/SearchIcon';
import { FilterIcon } from '@/components/Icons/FilterIcon';



function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  handleFilterModel
}:any) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(setGlobalFilter, 200)

  return (
      <div className='px-4 gap-x-2 items-baseline mb-4 mt-4 w-full'>
        <div className="relative rounded-md ">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {/* <Image alt="-" width={10} height={10} src={`/assets/images/search-sm.svg`} /> */}
            <SearchIcon />
          </div>
          <input
            type="text"
            name="price"
            id="price"
            style={{
              paddingTop: '12px',
              paddingBottom: '12px',
            }}
            value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            className="header-search-input rounded-md border-0 pl-9 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm  w-10/12"
            placeholder="Search..."
          />
            
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={()=>handleFilterModel()}
              className='filter-btn'
              >
              <span className='me-2 filter-text'>Filters</span>
              {/* <Image alt="-" width={10} height={10} className='inline me-1' src={`/assets/images/sliders-02.svg`} /> */}
              <FilterIcon className='inline' />
              
            </button>
          </div>
        </div>
      </div>
    
  )
}

export function CheckCell({ value }:any) {
  return (
    <span
    >
      <input type="checkbox" className="appearance-none checked:bg-blue-500" />
    </span>
  );
};



export function SpecialitiesCell({ value }:any) {
  const Specualities = Array.isArray(value) ? value : [];

  return Specualities.map((sp:String, index:any)=>{
    return (
      <span
        key={index+'-int'}
        className={
          classNames(
            "pills-text"
          )
        }
      >
        {sp}
      </span>
    );
  })
  
};

export function AvatarCell({ value, column, row }:any) {
  
  return (
    <div className="flex items-center">
      <div className="">
      <span style={{backgroundColor:row.original.color}} className="px-3 py-2 uppercase leading-wide font-bold text-xs rounded-lg shadow-sm text-white">{value.charAt(0)}</span>
      </div>
      <div className="ml-4">
        <div className="text-sm theme-text">{value}</div>
      </div>
    </div>
  )
}


function Table(props: any) {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  }:any = useTable({
    columns:props.columns,
    data: props.data,
  },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,  // new
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }:any) => (
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }:any) => (
            <div>
              <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            </div>
          ),
          disableSortBy: true
        },
        ...columns,
      ]);
    }
  );
  
  return (
    <>
      <div className="sm:flex sm:gap-x-2">
        
      </div>
      {/* table */}
      <div className="my-4 flex flex-col shadow-2xl">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle  inline-block min-w-full sm:px-6 lg:px-8">
            <div className="">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                handleFilterModel={props.handleFilterModel}
              />
              {headerGroups.map((headerGroup:any) =>
                headerGroup.headers.map((column:any) =>
                  column.Filter ? (
                    <div className="mt-2 sm:mt-0" key={column.id}>
                      {column.render("Filter")}
                    </div>
                  ) : null
                )
              )}
              <table {...getTableProps()} className="min-w-full rounded-sm">
                <thead className="bg-white">
                  {headerGroups.map((headerGroup:any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}
                      
                    >
                      {headerGroup.headers.map((column:any) => (
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left thead-text uppercase tracking-wider"
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          <div className="flex items-center justify-between">
                            {
                              column.render('Header')
                            }
                            <span>
                              {
                                column.disableSortBy === true ? ('') : (
                                column.isSorted
                                ? column.isSortedDesc
                                  ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                  : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                : (
                                  <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                ))}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white "
                >
                  {page.map((row:any, i:any) => {  // new
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} 
                      className={`${ row.isSelected ? 'selected' : ''}`}
                      >
                        {row.cells.map((cell:any) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-5 whitespace-nowrap"
                              role="cell"
                            >
                              {cell.column.Cell.name === "defaultRenderer"
                                ? <div className="text-sm theme-text">{cell.render('Cell')}</div>
                                : cell.render('Cell')
                              }
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table;