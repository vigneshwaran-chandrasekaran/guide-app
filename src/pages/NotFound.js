import { Button, Result } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function NotFound() {
	const history = useHistory();
	const { recentlyVisitedUrl } = useSelector((state) => state.app);

	function handleGoBack() {
		history.push(recentlyVisitedUrl);
	}

	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={handleGoBack}>
					Back to previous page
				</Button>
			}
		/>
	);
}
