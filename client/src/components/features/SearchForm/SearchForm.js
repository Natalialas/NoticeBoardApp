import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


const SearchForm = () => {

  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Search ads..." onChange={(e) => setSearchPhrase(e.target.value)} />
      </Form.Group>
      <Link to={`/search/${searchPhrase}`}>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Link>
    </Form>
  );

};

export default SearchForm;