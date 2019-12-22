import React from 'react';
import CustomCard from '@/components/CustomCard';
import HomeworkFilter from './components/HomeworkFilter';
import HomeworkTable from './components/HomeworkTable';

const StudentHomework: React.FC<{}> = () => (
  <>
    <CustomCard>
      <HomeworkFilter />
    </CustomCard>
    <CustomCard>
      <HomeworkTable />
    </CustomCard>
  </>
)

export default StudentHomework;
