import { render, screen, fireEvent } from '@testing-library/react';
import PurchaseForm from '.Purchase/PurchaseForm'; // 경로는 컴포넌트 위치에 따라 다를 수 있습니다.
import '@testing-library/jest-dom';

describe('PurchaseForm', () => {
  test('inputs should update state', () => {
    const userInfo = { 
        address: '123 Main St', 
        detailAddress: 'Apt 1', 
        phone: '01012345678', 
        email: 'user@example.com', 
        postCode: '12345' };
        
    const orderInfo = []; // 필요한 경우 주문 정보를 추가하세요

    render(<PurchaseForm userInfo={userInfo} orderInfo={orderInfo} />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    expect(emailInput.value).toBe('newuser@example.com');
  });

  // 추가적인 테스트 케이스를 구현할 수 있습니다.
});