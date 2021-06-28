import styled from 'styled-components';

export const RoomContainer = styled.div`
  
  h3 {
    font-size: 2rem;
    margin: 3rem 0;

    @media(max-width: 600px) {
      font-size: 1rem;
    }
  }

  header {
    padding: 24px;
    border-bottom: 1px solid ${props => props.theme.colors.gray200};

    .content {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > img {
        max-height: 45px;
        cursor: pointer;
      }

      > div {
        display: flex;
        gap: 16px;
      }

      @media(max-width: 600px) {
        flex-direction: column;

        > img {
          margin-bottom: 1rem;
        }
      }
    }

    div.buttonsContainer {
      display: flex;
      align-items: center;

      > div {
        display: flex;
        align-items: center;

        button + button {
          margin-left: 1rem;
        }
      }
      @media(max-width:600px) {
        &.admin {
          flex-direction: column;
        }
      }
    }
  }

  main {
    max-width: 800px;
    padding: 0 1rem;
    padding-bottom: 5rem;
    margin: 0 auto;

    .room-title {
      margin: 32px 0 24px;
      display: flex;

      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        color: ${props => props.theme.colors.gray900};
      }

      span {
        margin-left: 1rem;
        background: ${props => props.theme.colors.highlight};
        border-radius: 999999px;
        padding: .5rem 1rem;
        color: ${props => props.theme.colors.whiteText};
        font-weight: 500;
        font-size: 0.8rem;
      }

      @media(max-width: 600px) {
        h1 {
          font-size: 1rem;
        }

        span {
          padding: .4rem;
          font-size: 0.6rem;
        }
      }
    }

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 16px;
        border-radius: 8px;
        background: ${props => props.theme.colors.gray100};
        box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        resize: vertical;
        min-height: 130px;
        color: ${props => props.theme.colors.gray900};

        &::placeholder {
          color: ${props => props.theme.colors.gray900};
        }
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 16px;

        .user-info {
          display: flex;
          align-items: center;

          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }

          span {
            margin-left: 8px;
            color: ${props => props.theme.colors.gray900};
            font-weight: 500;
            font-size: 14px;
          }
        }

        > span {
          font-size: 14px;
          color: ${props => props.theme.colors.gray300};
          font-weight: 500;

          button {
            background: transparent;
            border: none;
            color: ${props => props.theme.colors.primary};
            text-decoration: underline;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }

    .question-list {
      margin-top: 32px;
    }
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction:column;
  margin-top: 5rem;

  img {
    max-width: 12rem;
  }

  > div {
    margin-top: 2rem;
    text-align: center;
    font-family: 'Poppins', sans-serif;
  }

  @media(max-width: 600px) {
    img {
      max-width: 8rem;

      > div {
        h2 {
          font-size: .8rem;
        }
        p {
          font-size: .6rem;
        }
      }
    }
  }
`;