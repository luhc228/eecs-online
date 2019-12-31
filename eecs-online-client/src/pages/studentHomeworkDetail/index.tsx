/**
 * 学生查看作业完成情况
 */
import React from 'react';
import CustomCard from '@/components/CustomCard';
import Header from './components/Header';
import QuestionForm from './components/QuestionForm';

const studentHomeworkDetail: React.FC<{}> = () => (
  <>
    <CustomCard>
      <Header />
    </CustomCard>
    <CustomCard>
      <QuestionForm />
    </CustomCard>
  </>
)

export default studentHomeworkDetail;
