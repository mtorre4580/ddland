import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import styles from './searchbox.module.scss';

type onSearchCallback = (search: string) => void;

interface SearchboxProps {
    onSearch: onSearchCallback;
    placeholder: string;
}

export default React.memo(function Searchbox({ onSearch, placeholder }: SearchboxProps) {
    const [search, setSearch] = useState('');

    /**
     * Handle event onChange to send the callback
     * @param event 
     */
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearch(value);
        onSearch(value);
    };

    /**
     * Handle event onSubmit to avoid submit form, send callback
     * @param event 
     */
    const handleOnSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onSearch(search);
    };

    return (
        <Form className={styles.searchbox} onSubmit={handleOnSubmit}>
            <Form.Row>
                <Col>
                    <Form.Control className={styles.search} onChange={handleOnChange} placeholder={placeholder} type="search" name="search" value={search} />
                </Col>
            </Form.Row>
        </Form>
    );
});