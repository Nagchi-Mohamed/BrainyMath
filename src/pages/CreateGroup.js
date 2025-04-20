import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../hooks/useTranslation';
import { groupsService } from '../services/groupsService';
import { toast } from 'react-toastify';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props => props.theme.colors.primaryDark};
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover {
      background-color: ${props => props.theme.colors.background};
    }
  }
`;

const CreateGroup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    maxMembers: 10,
    schedule: '',
    isPrivate: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await groupsService.createGroup(formData);
      toast.success(t('groups.createSuccess'));
      navigate('/groups');
    } catch (err) {
      toast.error(err.response?.data?.message || t('errors.general'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>{t('groups.createGroup')}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>{t('groups.form.title')}</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('groups.form.description')}</Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('groups.form.level')}</Label>
          <Select
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="beginner">{t('lessons.difficulty.beginner')}</option>
            <option value="intermediate">{t('lessons.difficulty.intermediate')}</option>
            <option value="advanced">{t('lessons.difficulty.advanced')}</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>{t('groups.form.maxMembers')}</Label>
          <Input
            type="number"
            name="maxMembers"
            value={formData.maxMembers}
            onChange={handleChange}
            min="2"
            max="50"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('groups.form.schedule')}</Label>
          <Input
            type="text"
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            placeholder={t('groups.form.schedulePlaceholder')}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <Input
              type="checkbox"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
            />
            {t('groups.form.isPrivate')}
          </Label>
        </FormGroup>

        <ButtonGroup>
          <Button
            type="button"
            className="secondary"
            onClick={() => navigate('/groups')}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            className="primary"
            disabled={loading}
          >
            {loading ? t('common.loading') : t('common.create')}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default CreateGroup; 