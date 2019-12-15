import React, { useState, useEffect } from 'react';
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import { ColumnProps } from 'antd/es/table';
import { TransferItem } from 'antd/lib/transfer';

export interface TableTransferProps {
  dataSource: TransferItem[];
  targetKeys: any[];
  disabled: boolean;
  showSearch: boolean;
  onChange: (targetKeys: any[], direction: string, moveKeys: string[]) => void;
  filterOption: (inputValue: string, option: any) => boolean;
  rowKey: (record: any) => string;
  leftColumns: ColumnProps<any>[];
  rightColumns: ColumnProps<any>[];
  children?: React.ReactNode;
}

const TableTransfer: React.SFC<TableTransferProps> = ({ leftColumns, rightColumns, children, dataSource, ...restProps }) => {
  const [totalDataSource, changeTotalDataSource] = useState([]);

  useEffect(() => {

    changeTotalDataSource(dataSource)
  }, [dataSource])
  console.log(dataSource);
  return (
    <Transfer {...restProps} dataSource={dataSource} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <React.Fragment>

            {direction === 'left' && children}
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return;
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
          </React.Fragment>
          // <CustomTable
          //   loading={false}
          //   rowSelection={rowSelection}
          //   columns={columns}
          //   dataSource={filteredItems}
          //   rowKey="id"
          //   size="small"
          //   total={20}
          //   current={1}
          //   pageSize={8}
          //   onPagination={(current: number) => { }}
          // />
        );
      }}
    </Transfer>
  )
}

export default TableTransfer;
