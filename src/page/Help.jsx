import Logo from '../assets/images/logo.jpg';
import { FaqList } from '../FaqList';
import './help.css';

function HelpPage() {
  return (
    <div>
      <header>
        <img src={Logo} alt="Logo" id="logo-help" />
      </header>
      <div id="container">
        <div id="title-container">
          <div id="title-help">Ajuda</div>
        </div>
        {/* <div id="main-section"> */}
        <div id="faq-container">
          <div id="faq">Dúvidas frequentes</div>
          <div id="faq-list-container">
            <ul>
              {FaqList.map((itens) => (
                <li key={itens.id}>{itens.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <div id="support-container">
          <div id="support">Contato Suporte</div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default HelpPage;
