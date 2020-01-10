/**
 * 学生查看编辑作业完成情况
 */
import React from 'react';
import CustomCard from '@/components/CustomCard';
import Header from './components/Header';
import QuestionForm from './components/QuestionForm';

const teacherHomeworkDetail: React.FC<{}> = () => (
  <>
    <CustomCard>
      <Header />
    </CustomCard>
    <CustomCard>
      <QuestionForm />
    </CustomCard>
  </>
);

export default teacherHomeworkDetail;
