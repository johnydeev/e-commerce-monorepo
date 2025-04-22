import { ICustomerModel } from "../models/customer.model";
import Customer from "../models/customer.model";
import ServerError from "../utils/Errors/serverError.util";

class AuthRepository {

    async findByVerificationToken(
            email: string
        ): Promise<ICustomerModel | null> {
            const user_found: ICustomerModel | null = await Customer.findOne({
                email,
            });
            
            return user_found;
        }
}

const authRepository = new AuthRepository();
export default authRepository;