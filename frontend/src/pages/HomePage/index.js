/* eslint-disable no-useless-constructor */
import React from 'react';
import Header from '../../Components/Header';
import { Container, InputGroup, FormControl, Button, Alert, Spinner} from 'react-bootstrap';
import { ContentContainer, Form, AdsBlock } from './styles';
import ShortnerService from '../../services/ShortnerService';

class HomePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: '',
        }
        }

    handleSubmit = async(event) =>{
        event.preventDefault();

        const { url } = this.state;

        this.setState({ isLoading: true, errorMessage: '' });
        if (!url){
            this.setState({isLoading:false, errorMessage: 'Informe uma URL para ser encurtada!'});
        } else {
            try {
                const service = new ShortnerService();
                const result = await service.generate({ url });

                this.setState({ isLoading:false, code: result.code });
            } catch(error) {
                this.setState( { isLoading:false, errorMessage:'Ops, ocorreu um erro ao tentar encurtar a url! ' });
            }
        }
    }

    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    render() {
        const {isLoading, errorMessage, code} = this.state;
        return (
            <Container>
                <Header>Seu Novo Encurtador de URL. :)</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3">
                        <FormControl
                            placeHolder="Digite a url para encurtar"
                            defaultValue = ""
                            onChange={e => this.setState({ url: e.target.value })}
                        />
                        <InputGroup.Append>
                            <Button variant="primary" type="submit">Encurtar</Button>
                        </InputGroup.Append>
                        </InputGroup>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                            code && (
                                <>
                                    <InputGroup className="mb-3">
                                    <FormControl
                                        autoFocus={true}
                                        defaultValue = {`https://pitu.tk/${code}`}
                                        ref={(input)=>this.inputURL = input}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onclick={() => this.copyToClipboard()}>Copiar</Button>
                                    </InputGroup.Append>
                                    </InputGroup>
                                    <p>Para acompanhar as estatisticas, acesse https://pitu.tk/{code}/stats</p>
                                </>
                            )
                        )}
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    </Form>
                </ContentContainer>
                <ContentContainer>
                    <AdsBlock>Adsense</AdsBlock>
                </ContentContainer>
            </Container>
        )
    }
}

export default HomePage;