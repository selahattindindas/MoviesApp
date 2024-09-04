
# MovieApp

MovieApp is a movie management application developed with Angular 16, compatible with a .NET 7-based backend API. This project includes both a user interface (UI) and an admin panel.



## Project Summary

MovieApp is an application that allows users to manage movie categories and platforms, and perform operations such as adding, updating, deleting, and searching movies through the movie interface. While movies, categories, and platforms can be managed via the admin panel, the user interface (UI) allows for login and registration, as well as listing movies by category, platform, and release status. The project also includes responsive features for both the admin and UI sections.
## Project Features

### Admin Panel: 

- Dashboard: Statistical information about movies and users is provided using the AmCharts 5 library.

- Movie Management: Includes functionality for adding, updating, deleting, and listing movies, as well as searching and filtering movies by categories.

- Category and Platform Management: Similar to movie management, categories and platforms can be added, updated, deleted, and listed.

- User Management: Only login functionality is available in the admin panel.

### User Interface (UI):

- Banner: A visually appealing slider component is used for movie photos, implemented with the Keen-Slider library.

- Movie List: Movies are listed in the user interface, and their details can be viewed.

- Login and Register: Users can perform login and register operations.

- Search and Filtering: Search and filtering functionality is provided based on categories.

### Shared Components and Guard Structure: 

- Shared Module: Commonly used components have been created in the shared module and are reused throughout the project.

- Guard Structure: A guard structure has been implemented to control user access.

### Other Commonly Used Services:: 

- SweetAlertService: Used for custom alerts and notifications.

- HttpClientService: HttpClientService: Custom HTTP client service is used for API calls.

- DialogService: Modal and dialog management is handled using ngx-bootstrap.

### Responsive Design:

- Both the admin panel and the user interface (UI) are designed to be responsive and work properly across various devices.

## Technologies Used

Angular 16

AmCharts 5

Keen-Slider

SweetAlert2

ngx-bootstrap

ngx-spinner

fontawesome-free

jwt-decode

angular-jwt
## Frontend Setup

Clone the project:

```bash 
git clone git clone https://github.com/selahattindindas/MoviesApp.git

```

Navigate to the project directory:

```bash 
cd MovieApp
```

Install the necessary packages:

```bash 
npm install
```

Run the Angular application:

```bash 
ng serve
```
## Backend Setup 

1-) Clone the project and navigate to the directory:

```bash 
  git clone https://github.com/EnesCanYilmaz/MovieAPI.git
  cd MovieAPI

```

2-) Install the necessary dependencies:

Since the project is based on .NET 7, the .NET 7 SDK must be installed. No additional commands are needed to install dependencies as all required packages are defined in the project files.

3-) Create the migration:

If there are no existing migrations or if you need to create a new database schema, you can perform the migration process using the following command:

```bash 
dotnet ef migrations add InitialCreate
```

4-) Update the database:

After creating the migration, run the following command to update your database:

```bash 
dotnet ef database update
```

5-) Run the API:

```bash 
dotnet run
```
