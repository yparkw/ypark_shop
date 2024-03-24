import { axiosInstance } from '../../api/axiosInstance';

export function useIdentityVerification(props) {  
    const verifyIdentity = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post('/api/verify-identity', {});
        if (response.data.success) {
          props.setIdentifyVerified(true);
        } else {
          setError("인증에 실패하였습니다. 에러 내용: " + response.data.error_msg);
        }
      } catch (error) {
        setError("인증 요청 실패: " + error.toString());
      } finally {
        setLoading(false);
      }
    };
  
    return { identifyVerified, loading, error, verifyIdentity };
  }