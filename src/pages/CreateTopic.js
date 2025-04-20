import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { forumService } from '../services/forumService';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  background-color: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  background-color: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.border};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  padding: 2rem;
  background-color: ${props => props.theme.colors.errorLight};
  border-radius: ${props => props.theme.borderRadius.md};
  margin: 2rem 0;
`;

const CreateTopic = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesData = await forumService.getCategories();
      setCategories(categoriesData);
      if (categoriesData.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: categoriesData[0].id }));
      }
    } catch (err) {
      setError(err.message);
      toast.error(t('errors.general'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      toast.error(t('forum.createTopicForm.validation'));
      return;
    }
    
    try {
      setLoading(true);
      await forumService.createTopic(formData);
      toast.success(t('forum.createTopicForm.success'));
      navigate('/forum');
    } catch (err) {
      toast.error(t('errors.general'));
    } finally {
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) {
    return <LoadingSpinner>{t('common.loading')}</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{t('errors.general')}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>{t('forum.createTopicForm.title')}</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">{t('forum.createTopicForm.titleLabel')}</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('forum.createTopicForm.titlePlaceholder')}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="categoryId">{t('forum.createTopicForm.categoryLabel')}</Label>
          <Select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="content">{t('forum.createTopicForm.contentLabel')}</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder={t('forum.createTopicForm.contentPlaceholder')}
            required
          />
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton
            type="button"
            onClick={() => navigate('/forum')}
            disabled={loading}
          >
            {t('forum.createTopicForm.cancel')}
          </CancelButton>
          <SubmitButton type="submit" disabled={loading}>
            {t('forum.createTopicForm.submit')}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CreateTopic; 