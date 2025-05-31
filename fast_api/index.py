from fastapi import FastAPI
from typing import Union
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, Query, HTTPException
app=FastAPI()
phone_dictionary={
    
    "Reception": "9 or 300",
    "Principal": "201",
    "Vice Principal": "202",
    "Chief Executive Officer": "203",
    "Main Office (Admission)": "204",
    "Office Superintendent (Accounts)": "205",
    "Cash Counter": "206",
    "Board Room": "207",
    "Department Of Mathematics": "208",
    "Department Of Basic Science (Chem & Phy)": "209",
    "Maintenance Department": "210",
    "Server Room": "211",
    "HoD - Chemistry": "212",
    "Department Of Computer Science- HoD": "213",
    "CSE Lab": "214",
    "College Canteen": "215",
    "Stores": "216",
    "HoD-Mathematics/Basic Science Office": "217",
    "HoD-Physics": "218",
    "Administrative Officer": "219",
    "Security (Main Gate)": "220",
    "HoD & Office - E&C": "221",
    "Staff Room - E&C (First Floor-Left)": "222",
    "Staff Room - E&C (First Floor-Right)": "223",
    "Lab - E&C": "224",
    "Staff Room – CSE": "226",
    "Principal Guest House": "227",
    "Security Officer": "228",
    "President Room (Swamiji Room)": "229",
    "Staff Room - E&C (Second Floor)": "230",
    "HoD & Office - Civil": "231",
    "Concrete Lab - Civil": "232",
    "Staff Room - Civil": "233",
    "Gt Lab - Civil": "234",
    "CIVIL CAED LAB 1st FLOOR": "235",
    "Staff Room - CSE (Second Floor)": "236",
    "Girls Hostel": "237",
    "Boys Hostel": "238",
    "Chemistry Lab": "239",
    "HoD - Mechanical": "241",
    "Office / Mechanical Staff Room": "242",
    "Dean - QA": "243",
    "Workshop": "246",
    "Research Lab": "247",
    "HoD - Office AI-DS": "248",
    "Estate Officer": "250",
    "Placement Office": "251",
    "Conference / Interview Room": "252",
    "Librarian": "253",
    "Circulation Section (Library New Block)": "254",
    "Stationery (Shri Poorna Xerox)": "255",
    "Dean (Academics)": "258",
    "Physical Education Director": "260",
    "Programmer (MIS)": "261",
    "HR / Exam Section": "262",
    "Incubation Center (CEO)": "263",
    "MBA Director": "271",
    "MBA Office": "272",
    "MBA AO": "273",
    "MBA Library": "274",
    "NCON Principal": "301",
    "Melita (PA)": "303",
    "NCAHS Principal": "304",
    "Accounts - (NCON/NCAHS)": "305"
}


@app.get("/")
def read_root():
    return phone_dictionary

@app.get("/get_sorted_by_name")
def sort_by_name():
    sorted_names = sorted(phone_dictionary.keys())
    return {"sorted_names": sorted_names}


@app.get("/get_sorted_by_names_html", response_class=HTMLResponse)
def get_sorted_names_html():
    sorted_names = sorted(phone_dictionary.items(), key=lambda item: item[0])
    
    html_content = "<h2>Sorted Phone Directory Names</h2><ul>"
    for name, extension in sorted_names:
        html_content += f"<li>{name}: {extension}</li>"
    html_content += "</ul>"
    
    return html_content

@app.get('/get_sort_by_extension',response_class=HTMLResponse)
def get_sorted_by_extension_html():
    sorted_items = sorted(phone_dictionary.items(), key=lambda item: item[1])

    
    html_content = "<h2>Phone Directory Sorted by Extension</h2><ul>"
    for name, extension in sorted_items:
        html_content += f"<li>{name}: {extension}</li>"
    html_content += "</ul>"
    
    return html_content





@app.get("/get_name_by_extension/")
def get_name_by_extension(extension: str = Query()):
    # Search for all keys (names) where extension matches or contains the input
    results = [name for name, ext in phone_dictionary.items() if extension in ext]
    

    if not results:
        raise HTTPException(status_code=404, detail="Extension not found")
    
    html_content = f"{extension} : {results}"
    
    return html_content
