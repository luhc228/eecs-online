import React from 'react';
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

const TableTransfer: React.SFC<TableTransferProps> = ({
  leftColumns,
  rightColumns,
  children,
  dataSource,
  ...restProps
}) =>
  // const [totalDataSource, changeTotalDataSource] = useState([]);

  // useEffect(() => {
  //   changeTotalDataSource(dataSource)
  // }, [dataSource])
  (
    <Transfer
      {...restProps}
      dataSource={dataSource}
      showSelectAll={false}
    >
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
          getCheckboxProps: (item: any) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected: any, selectedRows: any) {
            const treeSelectedKeys = selectedRows
              .filter((item: any) => !item.disabled)
              .map(({ key }: { key: any }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }: { key: any }, selected: any) {
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
        );
      }}
    </Transfer>
  )


export default TableTransfer;
