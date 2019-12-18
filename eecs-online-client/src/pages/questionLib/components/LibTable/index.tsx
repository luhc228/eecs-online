import React from 'react';
import CustomTable from '@/components/CustomTable';
import { QUESTION_TYPE } from '@/enums';

interface LibTableProps {
  questionType: QUESTION_TYPE.Single | QUESTION_TYPE.Multiple | QUESTION_TYPE.Program | QUESTION_TYPE.Judge;
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

export default LibTable;
