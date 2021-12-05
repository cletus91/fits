import OrderItemStyles from './styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

export default function OrderItem({ order }) {
  return (
    <OrderItemStyles>
      <div className="order=item">
        <p>{order.user.name}</p>
        <p>{order.user.email}</p>
        <p>Order Total: {formatMoney(order.total)}</p>
        Items:{' '}
        <div className="order=item">
          {order.items.map((item) => (
            <p key={item.id}>
              <img
                src={item?.photo?.image?.publicUrlTransformed}
                width="50"
                height="50"
                alt={item?.photo?.altText}
              />
              {item.name}: {formatMoney(item.price)} &times; {item.quantity} Ea.
            </p>
          ))}
        </div>
      </div>
    </OrderItemStyles>
  );
}
