import React, { useLayoutEffect } from 'react';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { FiberManualRecord, Remove } from '@material-ui/icons';

import useStyles from './styles';

const PrivacyPolicy: React.FC = () => {
  const classes = useStyles();

  useLayoutEffect(() => {
    document.title = 'Política de Privacidade - Saúde Timon 24h';
  }, []);

  return (
    <main className={classes.content}>
      <Container>
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src="/assets/images/logoUnoCollect.png"
            alt="Logo Uno Collect"
            width="300"
          />
          <Typography component="h1" variant="h4" className={classes.pageTitle}>
            Política de privacidade do aplicativo Uno Collect
          </Typography>

          <section className={classes.questions}>
            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Quais dados coletamos?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Coletamos dados de formulários cadastrados pela administração,
                  juntamente com dados de localização do usuário.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Como usamos suas informações?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Usamos os dados coletados para a geração de relatórios
                  internos da empresa.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Com quem compartilhamos seus dados?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Os dados enviados são armazenados no servidor do sistema não
                  sendo em hipótese alguma compartilhados com outros serviços ou
                  sistemas.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Serviços de publicidade
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Os dados enviados não são em hipótese alguma compartilhados
                  com quaisquer serviços de publicidade.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Onde processamos seus dados?
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Os dados enviados são processados em um servidor da plataforma
                  Google Cloud Platform localizado nos EUA.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Alterações na política de privacidade
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Reservamos o direito de modificar essa política de privacidade
                  a qualquer momento, então, é recomendável que o usuário
                  revise-a com frequência.
                </Typography>
              </div>
            </div>

            <div className={classes.questionBox}>
              <div className={classes.question}>
                <FiberManualRecord className={classes.icon} />
                <Typography component="span" className={classes.questionTxt}>
                  Contato
                </Typography>
              </div>
              <div className={classes.answer}>
                <Remove className={classes.icon} />
                <Typography component="p" className={classes.answerTxt}>
                  Para maiores informações acerca dessa política de privacidade
                  e/ou acerca do uso dos dados coletados, entrar em contato com
                  contato@unocomunicacao.com.
                </Typography>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default PrivacyPolicy;
