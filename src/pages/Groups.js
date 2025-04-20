import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { groupsService } from '../services/groupsService';
import { toast } from 'react-toastify';
import { FaUsers, FaCalendar, FaLock, FaGlobe } from 'react-icons/fa';

const GroupsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ecf0f1;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? '#4a6bff' : 'transparent'};
  color: ${props => props.active ? '#4a6bff' : '#7f8c8d'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #4a6bff;
  }
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const GroupCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const GroupHeader = styled.div`
  padding: 1.5rem;
  background-color: #4a6bff;
  color: white;
`;

const GroupTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const GroupMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const GroupContent = styled.div`
  padding: 1.5rem;
`;

const GroupDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const GroupStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const JoinButton = styled(Link)`
  display: inline-block;
  background-color: #4a6bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #3a5bef;
  }
`;

const LeaveButton = styled.button`
  display: inline-block;
  background-color: #e74c3c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  transition: background-color 0.3s;
  margin-top: 1rem;
  margin-left: 1rem;

  &:hover {
    background-color: #c0392b;
  }
`;

const CreateGroupButton = styled.button`
  display: block;
  background-color: #2ecc71;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 2rem auto;

  &:hover {
    background-color: #27ae60;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ecf0f1;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a6bff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ecf0f1;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4a6bff;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ecf0f1;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a6bff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  background: #4a6bff;
  color: white;
  
  &:hover:not(:disabled) {
    background: #3a5bef;
  }
`;

const CancelButton = styled(Button)`
  background: #ecf0f1;
  color: #2c3e50;
  
  &:hover:not(:disabled) {
    background: #dfe6e9;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  
  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4a6bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 1rem;
  background-color: #fde8e8;
  border-radius: 5px;
  margin: 1rem 0;
`;

const Groups = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myGroups');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'beginner',
    maxMembers: 10,
    schedule: '',
    isPrivate: false
  });

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = activeTab === 'myGroups' 
        ? await groupsService.getUserGroups() 
        : await groupsService.getAllGroups();
      setGroups(data);
    } catch (err) {
      setError(err.message);
      toast.error(t('errors.groupsLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [activeTab]);

  const handleJoinGroup = async (groupId) => {
    try {
      await groupsService.joinGroup(groupId);
      toast.success(t('groups.joinSuccess'));
      fetchGroups();
    } catch (err) {
      toast.error(t('errors.joinGroup'));
    }
  };

  const handleLeaveGroup = async (groupId) => {
    try {
      await groupsService.leaveGroup(groupId);
      toast.success(t('groups.leaveSuccess'));
      fetchGroups();
    } catch (err) {
      toast.error(t('errors.leaveGroup'));
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      await groupsService.createGroup(formData);
      toast.success(t('groups.createSuccess'));
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        level: 'beginner',
        maxMembers: 10,
        schedule: '',
        isPrivate: false
      });
      fetchGroups();
    } catch (err) {
      toast.error(t('errors.createGroup'));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <GroupsContainer>
      <PageTitle>{t('groups.title')}</PageTitle>
      
      <TabsContainer>
        <Tab
          active={activeTab === 'myGroups'}
          onClick={() => setActiveTab('myGroups')}
        >
          {t('groups.myGroups')}
        </Tab>
        <Tab
          active={activeTab === 'availableGroups'}
          onClick={() => setActiveTab('availableGroups')}
        >
          {t('groups.availableGroups')}
        </Tab>
      </TabsContainer>

      {activeTab === 'availableGroups' && (
        <Button onClick={() => setShowCreateModal(true)}>
          {t('groups.createGroup')}
        </Button>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <GroupsGrid>
          {groups.map(group => (
            <GroupCard key={group.id}>
              <GroupHeader>
                <GroupTitle>{group.title}</GroupTitle>
                <GroupMeta>
                  <span><FaUsers /> {group.members}/{group.maxMembers}</span>
                  <span><FaCalendar /> {group.schedule}</span>
                  {group.isPrivate ? <FaLock /> : <FaGlobe />}
                </GroupMeta>
              </GroupHeader>
              <GroupContent>
                <GroupDescription>{group.description}</GroupDescription>
                <GroupStats>
                  <span>{t('groups.level')}: {t(`lessons.difficulty.${group.level}`)}</span>
                  <span>{t('groups.nextSession')}: {group.nextSession}</span>
                </GroupStats>
                {activeTab === 'availableGroups' ? (
                  <JoinButton onClick={() => handleJoinGroup(group.id)}>
                    {t('groups.join')}
                  </JoinButton>
                ) : (
                  <LeaveButton onClick={() => handleLeaveGroup(group.id)}>
                    {t('groups.leave')}
                  </LeaveButton>
                )}
              </GroupContent>
            </GroupCard>
          ))}
        </GroupsGrid>
      )}

      {showCreateModal && (
        <Modal>
          <ModalContent>
            <h2>{t('groups.createGroup')}</h2>
            <Form onSubmit={handleCreateGroup}>
              <FormGroup>
                <Label>{t('groups.form.title')}</Label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>{t('groups.form.description')}</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>{t('groups.form.level')}</Label>
                <Select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder={t('groups.form.schedulePlaceholder')}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>
                  <Input
                    type="checkbox"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                  />
                  {t('groups.form.isPrivate')}
                </Label>
              </FormGroup>
              
              <ButtonGroup>
                <CancelButton onClick={() => setShowCreateModal(false)}>
                  {t('common.cancel')}
                </CancelButton>
                <SubmitButton type="submit">
                  {t('common.create')}
                </SubmitButton>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </GroupsContainer>
  );
};

export default Groups; 