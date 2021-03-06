import * as React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { dieTestArthaCells, skillsLearningCells } from './../../TableConfig'

const DTARow = (props) => {
	const { attribute, row, handleDialogToggle, setDialogData, setDialogType } =
		props

	// Remove _id from row
	delete row._id

	// Get list of cells to iterate over
	let rowCells = dieTestArthaCells.slice(1)
	if (attribute === 'skillsLearning') {
		rowCells = skillsLearningCells.slice(1)
	}
	return (
		<React.Fragment>
			<TableRow hover>
				<TableCell component="th" scope="row">
					<IconButton
						aria-label="edit row"
						size="small"
						onClick={() => {
							handleDialogToggle()
							setDialogData(row)
							setDialogType('edit')
						}}
					>
						<EditIcon />
					</IconButton>
				</TableCell>
				{rowCells.map((cell, i) => {
					if (cell.id === 'empty') {
						return <TableCell key={i} />
					} else {
						return (
							<TableCell key={i} align={cell.align}>
								{row[cell.id]}
							</TableCell>
						)
					}
				})}
			</TableRow>
		</React.Fragment>
	)
}

export default DTARow
