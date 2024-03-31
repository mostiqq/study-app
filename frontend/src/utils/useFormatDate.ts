export const useFormatDate = (createdAt: string) => {
	const date: Date = new Date(createdAt)
	const day: string =
		date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
	const month: string =
		date.getMonth() + 1 < 10
			? `0${date.getMonth() + 1}`
			: `${date.getMonth() + 1}`
	const year: number = date.getFullYear()
	const formattedDate: string = `${day}.${month}.${year}`

	return formattedDate
}
