/**
 * 学生编辑作业
 */
import React from 'react';
import CustomCard from '@/components/CustomCard';
import QuestionForm from './components/QuestionForm';

const studentHomeworkEdit: React.FC<{}> = () => (
  <CustomCard>
    <QuestionForm />
  </CustomCard>
)

export default studentHomeworkEdit;
