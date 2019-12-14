import React from 'react';
import { TableComponents, TableEventListeners } from 'antd/es/table';
import { Table, Pagination } from 'antd';
import { ButtonProps } from '@/interfaces/components';
import { PAGINATION_CONFIGS } from '@/constants';


interface CustomTableProps {
  loading: boolean;
  total?: number;
  current?: number;
  pageSize?: number;
  columns: object[];
  dataSource: object[];
  buttons?: ButtonProps[];
  rowSelection?: object;
  expandedRowKeys?: string[];
  components?: TableComponents;
  rowKey: string | ((record: any) => string);
  size?: 'small' | 'middle';
  onRow?: (record: any, index?: number) => TableEventListeners;
  onPagination?: (current: number) => void;
  onExpand?: (expanded: any, record: any) => void;
  expandedRowRender?: () => React.ReactNode;
}

const CustomTable: React.SFC<CustomTableProps> = ({
  loading,
  columns,
  dataSource,
  rowKey,
  onPagination,
  total,
  current,
  pageSize,
  components,
  expandedRowRender,
  onExpand,
  expandedRowKeys,
  rowSelection,
  onRow,
  size,
}) => (
    <React.Fragment>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={rowKey}
        components={components}
        size={size}
        expandedRowRender={expandedRowRender}
        onExpand={onExpand}
        expandedRowKeys={expandedRowKeys !== undefined ? expandedRowKeys : []}
        rowSelection={rowSelection}
        onRow={onRow}
        scroll={{ x: true }}
      />
      {onPagination !== undefined && (
        <Pagination
          className="ant-table-pagination"
          showQuickJumper
          size={size}
          total={total}
          pageSize={pageSize}
          current={current}
          onChange={onPagination}
        />
      )}
    </React.Fragment>
  )

CustomTable.defaultProps = {
  buttons: [],
  loading: false,
  pageSize: PAGINATION_CONFIGS.pageSize,
  size: 'middle',
}

export default CustomTable;
