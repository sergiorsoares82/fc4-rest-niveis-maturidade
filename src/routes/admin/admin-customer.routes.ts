import { Router } from 'express';
import { createCustomerService } from '../../services/customer.service';

const router = Router();

router.post('/', async (req, res) => {
  const customerService = await createCustomerService();
  const { name, email, password, phone, address } = req.body;
  const customer = await customerService.registerCustomer({
    name,
    email,
    password,
    phone,
    address,
  });
  res.json(customer);
});

router.get('/:customerId', async (req, res) => {
  const customerService = await createCustomerService();
  const customer = await customerService.getCustomer(
    parseInt(req.params.customerId as string),
  );
  res.send(customer ? customer : { message: 'Customer not found' });
  //res.json(customer);
});

router.patch('/:customerId', async (req, res) => {
  const customerService = await createCustomerService();
  const { phone, address, email, password } = req.body;
  const customer = await customerService.updateCustomer({
    customerId: parseInt(req.params.customerId),
    phone,
    address,
    email,
    password,
  });
  res.json(customer);
});

router.delete('/:customerId', async (req, res) => {
  const customerService = await createCustomerService();
  await customerService.deleteCustomer(parseInt(req.params.customerId));
  res.send({ message: 'Customer deleted successfully' });
});

router.get('/', async (req, res) => {
  const customerService = await createCustomerService();
  const { page = 1, limit = 10 } = req.query;
  const { customers, total } = await customerService.listCustomers({
    page: parseInt(page as string),
    limit: parseInt(limit as string),
  });
  res.json({ customers, total });
});

export default router;
