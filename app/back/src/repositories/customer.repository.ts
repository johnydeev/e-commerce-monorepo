import Customer, { ICustomerModel } from "../models/customer.model";
import ServerError from "../utils/Errors/serverError.util";
import { ICustomer } from "../interfaces/customer.interface";
import { UpdateCustomerDTO } from "../dtos/customer/updateCustomer.dto";


class CustomerRepository {
    async findById(id: string): Promise<ICustomerModel | null> {
        
        return await Customer.findById(id);
    }

    async findByEmail(email: string): Promise<ICustomerModel | null> {
        return await Customer.findOne({ email });
    }

    async getAll(): Promise<ICustomerModel[]> {
        return await Customer.find();
    }

    async create(customerData: ICustomer): Promise<ICustomerModel> {
        const customer = new Customer(customerData);
        return await customer.save();
    }

    async update(
        id: string,
        updateData: UpdateCustomerDTO
    ): Promise<ICustomerModel | null> {
        
        return await Customer.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
    }

    async delete(id: string): Promise<ICustomerModel | null> {
        
        return await Customer.findByIdAndDelete(id);
    }
}

const customerRepository = new CustomerRepository();
export default customerRepository;
