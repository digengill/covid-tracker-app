import numeral from "numeral";


export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b) =>{
        if (a.cases > b.cases)
        {
            return -1;
        }
        else{
            return 1;
        }
    })
    return sortedData;


}

export const formatInt = (number) =>
{
    if (number)
    {
        return numeral(number).format("+0.0a");
    }
    else{
        return 0;
    }
}