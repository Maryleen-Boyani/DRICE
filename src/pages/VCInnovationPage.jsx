import { useNavigate } from '@tanstack/react-router';
import VCInnovationForm from '../components/Grants/VCInnovationForm';

export default function VCInnovationPage() {
  const navigate = useNavigate();
  return <VCInnovationForm onBack={() => navigate({ to: '/grants' })} />;
}
