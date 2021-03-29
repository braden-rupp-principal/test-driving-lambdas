
import {getStatus} from './../../src/service/accountStatusService';
import {getStatusByFullName, Status} from './../../src/repository/statusRepository';
import {mocked} from 'ts-jest/utils'; 

jest.mock('./../../src/repository/statusRepository')
const mockGetStatusByFullName = mocked(getStatusByFullName);


test('should call the statusRespository', () => {

        getStatus('', '');

        expect(mockGetStatusByFullName).toHaveBeenCalled();
});

test('should call the statusRespository with a full name', () => {

    getStatus('Braden', 'Rupp');

    expect(mockGetStatusByFullName).toHaveBeenCalledWith('BRADEN_RUPP');
});

test('should return a status', () => {

    mockGetStatusByFullName.mockReturnValue(Status.Verified);

    const status = getStatus('Braden', 'Rupp');

    expect(status).toEqual(Status.Verified);
});