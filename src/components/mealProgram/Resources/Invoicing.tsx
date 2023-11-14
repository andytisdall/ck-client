import './Invoicing.css';
import DownloadFile from '../../reusable/file/DownloadFile';

const FILENAME = 'meal-program/CK_Invoice_Template.xlsx';

const Invoicing = () => {
  return (
    <div>
      <h1>Invoicing</h1>
      <DownloadFile filename={FILENAME}>
        Download the invoice template (Excel)
      </DownloadFile>
      <p>
        Please send your invoices to{' '}
        <a href="mailto:meals@ckoakland.org">meals@ckoakland.org</a> by 5pm on
        Wednesdays. Invoices are processed on Fridays. We have provided a
        template to use if you’d like.
      </p>
      <p>All invoices should include:</p>
      <ul>
        <li>Invoice #</li>
        <li>Community partner served</li>
        <li>Delivery date</li>
        <li>Delivery fees ($40/delivery)</li>
        <li>Meals provided and meal menu description</li>
        <li>Price per meal</li>
        <li>Total price</li>
      </ul>

      <p>Example:</p>
      <section className="meal-program-invoice">
        <div className="meal-program-invoice-stripe"></div>
        <h1>INVOICE</h1>
        <div className="meal-program-invoice-header">
          <div className="meal-program-invoice-address">
            <p>Restaurant Name</p>
            <p>123 Street Address</p>
            <p>City, State, Zip/Post Code</p>
            <p>Phone Number, Email</p>
          </div>
          <div>
            <h2>DATE</h2>
            <h2>INVOICE NO.</h2>
          </div>
        </div>
        <h2>BILL TO</h2>
        <div className="meal-program-invoice-address">
          <p>Community Kitchens</p>
          <p>P.O. Box 16026</p>
          <p>Oakland, CA</p>
          <p>94610</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>COMMUNITY PARTNER SERVED</th>
              <th>MEAL DESCRIPTION</th>
              <th>DATE</th>
              <th>QTY</th>
              <th>UNIT PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>East Oakland Collective</td>
              <td>chicken, mac n cheese, green beans</td>
              <td>12/12/22</td>
              <td>75</td>
              <td>$11.00</td>
              <td>$825.00</td>
            </tr>
            <tr>
              <td>Town Fridges</td>
              <td>meatloaf and salad</td>
              <td>12/20/22</td>
              <td>50</td>
              <td>$11.00</td>
              <td>$550.00</td>
            </tr>
            <tr>
              <td>Delivery</td>
              <td></td>
              <td>12/12/22</td>
              <td>1</td>
              <td>$40.00</td>
              <td>$40.00</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p>Remarks / Payment Instructions:</p>
        <div className="meal-program-invoice-total">
          <p>Balance Due</p>
          <p>$1,415.00</p>
        </div>
        <div className="meal-program-invoice-stripe"></div>
      </section>
    </div>
  );
};

export default Invoicing;
