import React from 'react'
import { render } from '@vtex/test-tools/react'

import Fixed from './Fixed'

test('greets Fred', () => {
  const { queryByText } = render(<Fixed name="Fred" />)

  expect(queryByText('Hey, Fred')).toBeInTheDocument()
})
