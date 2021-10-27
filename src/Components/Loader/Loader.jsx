import { ImSpinner } from 'react-icons/im';

export default function Loader() {
  return (
    <div className="spinner">
      <div>
        <ImSpinner size="32" className="icon-spin" />
        Loading...
      </div>
    </div>
  );
}
