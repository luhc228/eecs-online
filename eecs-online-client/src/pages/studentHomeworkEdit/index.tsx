/**
 * 学生编辑作业
 */
import React from 'react';
import CustomCard from '@/components/CustomCard';
import QuestionForm from './components/QuestionForm';
import Header from './components/Header';

const studentHomeworkEdit: React.FC<{}> = () => (
  <>
    <CustomCard>
      <Header />
    </CustomCard>
    <CustomCard>
      <QuestionForm />
    </CustomCard>
  </>

)

export default studentHomeworkEdit;
