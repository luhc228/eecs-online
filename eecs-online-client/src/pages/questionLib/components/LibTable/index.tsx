import React from 'react';
import { connect } from 'dva';
import CustomTable from '@/components/CustomTable';
import { QUESTION_TYPE } from '@/enums';

interface LibTableProps {
  questionType: QUESTION_TYPE;
}

const LibTable: React.FC<LibTableProps> = ({ questionType }) => {
  console.log(333);
  return (
    <CustomTable
      loading={false}
      rowKey="id"
      columns={[]}
      dataSource={[]}
    />
  )
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(LibTable);
