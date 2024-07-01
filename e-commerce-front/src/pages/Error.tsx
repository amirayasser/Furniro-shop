import { Container } from 'react-bootstrap'
import { Link , isRouteErrorResponse , useRouteError } from 'react-router-dom'
import '@styles/globalStyle.css';

const Error = () => {
  const error = useRouteError();

  let errorStatus:number;
  let errorStatusText:string;

  if(isRouteErrorResponse(error)){
    errorStatus = error.status;
    errorStatusText = error.statusText;
  }else {
      errorStatus = 404;
      errorStatusText = "Page Not Found"
  }

  return (
    <Container className='notFound'>
      <h1>{errorStatus}</h1>
      <p>{errorStatusText}</p>
      <Link to={'/'} replace={true}>
      How about going back to safety?
      </Link>
    </Container>
  )
}

export default Error
