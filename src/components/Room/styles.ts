import styled, { css } from 'styled-components';

interface IStudents {
  id: number;
  firstName: string;
  lastName: string;
}

interface IRoomPlateProps {
  capacity: number;
  students: Array<IStudents>;
}

export const Container = styled.div<IRoomPlateProps>`
  background: #f0f0f5;
  border-radius: 8px;
  min-width: 370px;
  height: 100%;
  header {
    background-image: url('https://bit.ly/2PiFuhv');
    background-size: cover;
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;
    opacity: 0.3;
    ${props =>
      props.students.length < props.capacity &&
      css`
        opacity: 1;
      `};

    .capacity {
      display: flex;
      justify-content: flex-end;
      font-style: normal;
      font-size: 16px;
      color: #fff;
      b {
        padding: 10px 20px 0 0;

        font-weight: 600;
      }
    }
  }
  section.body {
    display: flex;
    flex-direction: column;
    h3 {
      padding: 20px;
      color: #000000;
      opacity: 1;
      align-self: center;
    }
    li {
      color: #000;
      list-style: none;
      padding-bottom: 20px;
      align-self: center;
    }
    p {
      color: #3d3d4d;
      padding: 30px 0 10px 10px;
    }
  }
  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;
    div.icon-container {
      display: flex;
      button {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;
        svg {
          color: #3d3d4d;
        }
        &:hover {
          background: rgba(57, 177, 0, 0.5);
          svg {
            color: #fff;
          }
        }
        & + button {
          margin-left: 6px;
          &:hover {
            background: rgba(199, 40, 40, 0.5);
            svg {
              color: #fff;
            }
          }
        }
      }
    }
    div.availability-container {
      display: flex;
      align-items: center;
      p {
        font-size: 14px;
        color: #3d3d4d;
      }
      .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 28px;
        margin-left: 12px;
        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;
          &:before {
            position: absolute;
            content: '';
            height: 16px;
            width: 16px;
            left: 8px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }
        input:checked + .slider {
          background-color: #39b100;
        }
        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }
        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
          left: 0;
        }
      }
    }
  }
`;
