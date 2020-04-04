import React, { Props, FunctionComponent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { DocumentNode } from "graphql";

const withQuery: any = (query: DocumentNode) => (WrappedComponent: FunctionComponent) => {
    return function WithQuery(props: Props<any>) {
        const { loading, error, data } = useQuery(query);

        if (loading) return <h1>Loading</h1>
        if (error) return <h1>Error</h1>

        return <WrappedComponent {...props} {...data} />
    }
}

export default withQuery;