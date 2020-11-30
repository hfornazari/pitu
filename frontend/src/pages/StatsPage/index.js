import React from 'react';
import Header from '../../Components/Header';
import { Container } from 'react-bootstrap';

import ShortnerService from '../../services/ShortnerService';

import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FontAwesomeIcon } from  '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

import vars from  '../../configs/vars';

class StatsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortnedURL: {},
            errorMessage: '',
        }
    }

    async componentDidMount(){
       const {code} = this.props.match.params;

        try {
            const service = new ShortnerService();
            const shortnedURL = await service.getStats(code);

            const parsedDate = parseISO(shortnedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parsedDate, currentDate, {locale: ptBR,});

            shortnedURL.relativeDate = relativeDate;

            this.setState({isLoading:false, shortnedURL});

        } catch (erro){
            this.setState({isLoading:false, errorMessage: 'Ops, a url solicitada não existe!'});
        }
    }

    render() {
        const {errorMessage, shortnedURL} = this.state;
        return (
            <Container>
                <Header>Estatísticas:</Header>
                {
                    errorMessage ? (
                        <StatsContainer  className="text-center">
                            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                            <p className="m-3">{errorMessage}</p>
                            <a className="btn btn-primary" href="/">Encurtar Nova URL</a>
                        </StatsContainer>
                    ) : (
                        <StatsContainer className="text-center">
                            <p><b>{vars.HOST_APP + shortnedURL.code}</b></p>
                            <p>Redireciona para: <br/>{shortnedURL.url}</p>
                            <StatsRow>
                                <StatsBox>
                                    <b>{shortnedURL.hits}</b>
                                    <StatsBoxTitle>Visitas</StatsBoxTitle>
                                </StatsBox>
                                <StatsBox>
                                    <b>{shortnedURL.relativeDate}</b>
                                    <StatsBoxTitle>Última Visita</StatsBoxTitle>
                                </StatsBox>                                
                            </StatsRow>
                            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                        </StatsContainer>
                    )
                }
            </Container>
        )
    }
}

export default StatsPage;