import React from 'react';
import { render, screen } from '@testing-library/react';
import RepoItem from '../components/RepoItem';

describe('RepoItem Component', () => {
  const mockRepo = {
    name: 'Sample Repo',
    description: 'This is a sample repository',
  };

  test('renders repository name and description', () => {
    render(<RepoItem repo={mockRepo} index={1} />);

    expect(screen.getByText(mockRepo.name)).toBeInTheDocument();

    expect(screen.getByText(mockRepo.description)).toBeInTheDocument();
  });

  test('applies "even" class for even indexes', () => {
    const { container } = render(<RepoItem repo={mockRepo} index={0} />);

    expect(container.firstChild).toHaveClass('repo-item even');
  });

  test('applies "odd" class for odd indexes', () => {
    const { container } = render(<RepoItem repo={mockRepo} index={1} />);

    expect(container.firstChild).toHaveClass('repo-item odd');
  });
});