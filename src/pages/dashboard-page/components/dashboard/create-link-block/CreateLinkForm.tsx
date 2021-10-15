import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../../context/AuthContext';
import { useLinks } from '../../../../../hooks/links.hook';
import { LinksService } from '../../../../../services/links.service';
import './CreateLinkForm.scss';

export const CreateLinkForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [linkName, setLinkName] = useState('');
  const [url, setUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [newShortLink, setNewShortLink] = useState('');

  const { accessToken, userId } = useContext(AuthContext);
  const { updateLinks } = useLinks();

  const validateForm = (): string | void => {
    if (!linkName || !url) {
      return 'All fields are required';
    }

    // Name validation
    if (linkName.length < 3) {
      return 'Name is too short';
    }

    // URL validation regex
    const urlRegex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );

    if (!urlRegex.test(url)) {
      return 'Incorrect url';
    }
  };

  const nameChangeHandler = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setLinkName(currentTarget.value);
  };

  const urlChangeHandler = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(currentTarget.value);
  };

  const createLinkHandler = async () => {
    const error = validateForm();
    if (error) {
      return setFormError(error);
    }

    setFormError('');

    const link = await LinksService.create(linkName, url, userId, accessToken)
      .catch(() => {
        setFormError('Something went wrong, try again later');
      })
      .then((data) => {
        setLoading(false);
        return data;
      });

    if (!link) return;

    setNewShortLink(link.shortUrl);

    // Refresh links in list
    await updateLinks();
  };

  return (
    <form className="create-link-form">
      <div className="form-field">
        <label htmlFor="nameInput" className="form-label">
          Link name
        </label>
        <input
          className="form-control"
          name="name"
          type="text"
          id="nameInput"
          placeholder="Name of your link"
          onChange={nameChangeHandler}
        />
      </div>
      <div className="form-field">
        <label htmlFor="originalUrlInput" className="form-label">
          URL
        </label>
        <input
          type="text"
          className="form-control"
          id="originalUrlInput"
          placeholder="https://example-url.com"
          onChange={urlChangeHandler}
        />
      </div>
      {formError && (
        <div className="form-error-block">
          <p className="text-danger">{formError}</p>
        </div>
      )}
      <div className="form-field">
        <button
          className="btn btn-primary"
          type="button"
          disabled={loading}
          onClick={createLinkHandler}
        >
          Create short link!
        </button>
      </div>
      {newShortLink && (
        <p className="new-short-link">
          Success! Your link - <a href={newShortLink}>{newShortLink}</a>
        </p>
      )}
    </form>
  );
};
