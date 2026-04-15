import { useNavigate } from '@tanstack/react-router';
import InternalGrantForm from '../components/Grants/InternalGrantForm';

export default function InternalResearchPage() {
  const navigate = useNavigate();
  return <InternalGrantForm onBack={() => navigate({ to: '/grants' })} />;
}
