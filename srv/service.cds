using employee as e  from '../db/schema';


service employeeService {

    entity employee as projection on e.employee;
}