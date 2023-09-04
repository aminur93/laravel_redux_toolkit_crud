<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::latest()->get();

        return response()->json([
            'employees' => $employees
        ],Response::HTTP_OK);
    }

    public function store(EmployeeRequest $request)
    {
        if($request->isMethod('post'))
        {
            DB::beginTransaction();

            try {
                //start here
                $employee = new Employee();

                $employee->name = $request->name;
                $employee->email = $request->email;
                $employee->phone = $request->phone;
                $employee->country = $request->country;
                $employee->city = $request->city;

                if ($request->hasFile('image')) {

                    $image_tmp = $request->file('image');

                    if ($image_tmp->isValid()) {

                        $path = public_path('images/');
                        !is_dir($path) &&
                            mkdir($path, 0777, true);
                
                        $imageName = time() . '.' . $request->image->extension();
                        $request->image->move($path, $imageName);

                        $employee->image = $imageName;
                    }
                }

                $employee->save();

                DB::commit();

                return response()->json([
                    'message' => 'Employee store successful'
                ],Response::HTTP_CREATED);

            } catch (Exception $e) {
                //rollback here
                DB::rollBack();

                $error = $e->getMessage();

                return response()->json([
                    'error' => $error
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function edit($id)
    {
        $employee = Employee::find($id);

        return response()->json([
            'employee' => $employee
        ],Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        if($request->_method == 'PUT')
        {
            DB::beginTransaction();

            try {
                //start here
                $employee = Employee::find($id);

                $employee->name = $request->name;
                $employee->email = $request->email;
                $employee->phone = $request->phone;
                $employee->country = $request->country;
                $employee->city = $request->city;

                if ($request->hasFile('image')) {

                    $image_tmp = $request->file('image');

                    if ($image_tmp->isValid()) {

                        if (file_exists(public_path().'/images/'.$employee->image)) {
                            unlink(public_path().'/images/'.$employee->image);
                        }

                        $path = public_path('images/');
                        !is_dir($path) &&
                            mkdir($path, 0777, true);
                
                        $imageName = time() . '.' . $request->image->extension();
                        $request->image->move($path, $imageName);

                        $employee->image = $imageName;
                    }
                }else{
                    $employee->image = $employee->image;
                }


                $employee->save();

                DB::commit();

                return response()->json([
                    'message' => 'Employee update successful'
                ],Response::HTTP_OK);

            } catch (Exception $e) {
                //rollback here
                DB::rollBack();

                $error = $e->getMessage();

                return response()->json([
                    'error' => $error
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function destroy($id)
    {
        $employee = Employee::find($id);

        if($employee->image == null)
        {
            $employee->delete();
        }else{
            if (file_exists(public_path().'/images/'.$employee->image)) {
                unlink(public_path().'/images/'.$employee->image);
            }
        }

        $employee->delete();

        return response()->json([
            'message' => 'Employee destroy successful'
        ],Response::HTTP_OK);
    }
}
