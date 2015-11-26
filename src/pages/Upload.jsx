import React from 'react';
import FileInput from 'react-file-input';

/*This page is only visible to me*/
class Upload extends React.Component {
	render() {
		return (
			<div className='upload'>
				<form method="post" action="/upload" encType="multipart/form-data">
					<FileInput className='file-uploader'
						name='file'
						accept='.xls,.xlsx'
						placeholder='Attachment' />
					
					<input className='password'
						name="password" 
						placeholder="Password" 
						type="password" />

					<input className='submit' type="submit" value="Upload"></input>
				</form>
			</div>
		);
	}
}

export default Upload;