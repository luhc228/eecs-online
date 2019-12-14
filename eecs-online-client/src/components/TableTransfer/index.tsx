import React from 'react';
import { Transfer, Table } from 'antd';
import difference from 'lodash/difference';
import { ColumnProps } from 'antd/es/table';
import CustomTable from '../CustomTable';

export interface TableTransferProps {
  dataSource: any[];
  targetKeys: any[];
  disabled: boolean;
  showSearch: boolean;
  onChange: (targetKeys: any[], direction: string, moveKeys: string[]) => void;
  filterOption: (inputValue: string, option: any) => boolean;
  leftColumns: ColumnProps<any>[];
  rightColumns: ColumnProps<any>[];
  rowKey: (record: any) => string;
}

const TableTransfer: React.SFC<TableTransferProps> = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      console.log(filteredItems);
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
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
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

export default TableTransfer;
